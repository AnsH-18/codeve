import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { auth } from "@/auth";
import { Snippet } from "@/models/schema";
import { ITag } from "@/models/schema";
import { ISnippet } from '@/models/schema'
import mongoose from "mongoose";

export interface LSnippet extends ISnippet {
    languageDoc: {_id: string, name: string, icon: string}
    tagDocs: [{
        _id: string,
        name: string,
        userId: string
    }]
    createdAt: string
    isFavorite: boolean
    trashed: boolean
}

export async function POST(request: NextRequest){
    const {title, description, code, language, tags} = await request.json()
    const session = await auth()
    if(!session?.user){
        return NextResponse.json({error: "You must be logged in to create a Tag"},
            {status: 401},
        )
    }
    await dbConnect()
    try {
        const tagIds =  tags.map((tag :ITag) => tag._id);
        const snippet = await Snippet.create({
            title, description, code, language, tags: tagIds, userId: session.user.id
        })
        if(!snippet){
            return NextResponse.json({error: "Cannot create an snippet"}, {status: 500})
        }
        return NextResponse.json({createdSnippet: snippet}, {status: 200}, )
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    const tagId = request.nextUrl.searchParams.get('tagId');
    const contentSet = request.nextUrl.searchParams.get('contentSet');
    const session = await auth()
  
    await dbConnect();
    let snippets: LSnippet[] = [];
  
    try {
      const userId = session?.user?.id; 
      const pipeline: any[]  = [
        {$match: { userId: new mongoose.Types.ObjectId(userId) }},
        {
          $lookup: {
            from: 'languages',
            localField: 'language',
            foreignField: 'name',
            as: 'languageDoc', 
          },
        },
        {
          $unwind: '$languageDoc',
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'tags',
            foreignField: '_id',
            as: 'tagDocs',
          },
        },
      ];
  
      if (contentSet === 'favorite') {
        pipeline.unshift({ $match: { isFavorite: true, trashed: false } });
      } else if (contentSet === 'trash') {
        pipeline.unshift({ $match: { trashed: true } });
      } else {
        pipeline.unshift({ $match: { trashed: false } });
      }
  
      if (tagId && tagId !== "all") {
        pipeline.push({
          $match: { tags: new mongoose.Types.ObjectId(tagId) }
        });
      }
  
      pipeline.push({
        $project: {
          _id: 1,
          title: 1,
          code: 1,
          language: 1,
          languageDoc: 1,
          tagDocs: 1,
          description: 1,
          createdAt: 1,
          isFavorite: 1,
          trashed: 1
        }
      });
  
      snippets = await Snippet.aggregate(pipeline);
  
      if (!snippets || snippets.length === 0) {
        return NextResponse.json(
          { error: 'No snippets found for the selected criteria' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ snippets }, { status: 200 });
    } catch (error) {
      console.error('Error fetching snippets:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
 
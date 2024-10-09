import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Tag } from "@/models/schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ITag } from "@/models/schema";

export interface LTag extends ITag{
    snippets : number
}

export async function POST(request: NextRequest) {
    const {name} = await request.json()
    const session = await auth()
    if(!session?.user){
        return NextResponse.json({error: "You must be logged in to create a Tag"},
            {status: 401},
        )
    }
    
    await dbConnect()
    try {
        const tag = await Tag.create({
            name,
            userId: session?.user.id
        })
        if(!tag){
            return NextResponse.json({error: "Cannot create a Tag"},
                {status: 500},
            )
        }

        return NextResponse.json({createdTag: tag}, {status: 200})
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }    
}

export async function GET() {
    const session = await auth();
    await dbConnect();
  
    try {
      const tags = await Tag.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(session?.user?.id as string),
          },
        },
        {
          $lookup: {
            from: 'snippets', 
            localField: '_id',
            foreignField: 'tags',
            as: 'snippets',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            userId: 1,
            snippets: { $size: '$snippets' }, 
          },
        },
      ]);
  
      if (!tags) {
        return NextResponse.json({ error: 'Cannot fetch Tags' }, { status: 500 });
      }
  
      return NextResponse.json({ tags: tags }, { status: 200 });
    } catch (error) {
      console.error('Error fetching tags:', error);
      return NextResponse.json({
        error: error
    }, {status: 500})
    }
  }

  export async function PATCH(request: NextRequest) {
    await dbConnect(); 

    try {
        const { tagId, newTagName } = await request.json(); 

        if (!tagId || !newTagName) {
            return NextResponse.json({ error: 'Tag ID and new tag name are required.' }, { status: 400 });
        }

        const updatedTag = await Tag.findByIdAndUpdate(
            tagId,
            { name: newTagName },
            { new: true } 
        );

        if (!updatedTag) {
            return NextResponse.json({ error: 'Tag not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Tag updated successfully.', tag: updatedTag }, { status: 200 });
    } catch (error) {
        console.error('Error updating tag:', error);
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
}

export async function DELETE(request: NextRequest) {
    await dbConnect();

    try {
        const { tagId } = await request.json();

        if (!tagId) {
            return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
        }

        const deletedTag = await Tag.findByIdAndDelete(tagId);

        if (!deletedTag) {
            return NextResponse.json({ error: "Tag not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Tag deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting tag:', error);
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
}
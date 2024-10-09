import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Snippet } from "@/models/schema";
import mongoose from "mongoose";
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log()
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid snippet ID' }, { status: 400 });
    }
  
    await dbConnect();
  
    try {
        const snippet = await Snippet.findById(id).populate('tags');

        if (!snippet) {
          return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
        }
    
        return NextResponse.json({ snippet }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
  }

  export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id); 
  
    await dbConnect();
  
    try {
      const { title, description, code, language, tags } = await request.json();
  
      const updatedSnippet = await Snippet.findByIdAndUpdate(
        id,
        { title, description, code, language, tags },
        { new: true } 
      );
  
      if (!updatedSnippet) {
        return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
      }
  
      return NextResponse.json({ updatedSnippet }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating snippet' }, { status: 500 });
    }
  }
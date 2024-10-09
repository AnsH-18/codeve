import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Snippet } from "@/models/schema";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }){
    const {id} = params
    await dbConnect();

    try {
        const snippet = await Snippet.findById(id);

        if (!snippet) {
            return NextResponse.json({ message: 'Snippet not found' }, { status: 404 });
        }

        snippet.isFavorite = !snippet.isFavorite;
        await snippet.save();

        return NextResponse.json({
            message: 'Favorite status updated',
            isFavorite: snippet,
        });
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
}
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
    try {
        const { id } = await params;
        const notes = await prisma.note.findFirst({
            where: {
                id: Number(id),
            },
        });

        if (!notes) {
            return NextResponse.json({ 
                message: "Note not found" 
            }, { status: 404 });
        }
        
        return NextResponse.json(notes);
    } catch (error) {
        if ( error instanceof Error ) {
            return NextResponse.json({ 
                error: error.message 
            }, { status: 500 });
        }
    }
}

export async function POST(request: Request, {params}: Params) {
    const {title, content} = await request.json();
    const note = await prisma.note.create({
        data: {
            title,
            content,
        },
    });
    return NextResponse.json(note);
}

export async function DELETE(request: Request, {params}: Params) {
    try {
        const { id } = await params;
        const deletedNote = await prisma.note.delete({
            where: {
                id: Number(id),
            },
        });

        if (!deletedNote) {
            return NextResponse.json({ 
                message: "Note not found" 
            }, { status: 404 });
        }

        return NextResponse.json(deletedNote);
    } catch (error) {
        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

            if (error.code === 'P2025') {
                return NextResponse.json({ 
                    message: "Note not found" 
                }, { status: 404 });
            }

            return NextResponse.json({ 
                error: error.message 
            }, { status: 500 });
        }
    }
}

export async function PUT(request: Request, {params}: Params) {
    try {
        const { id } = await params;
        const {title, content} = await request.json();
        const updatedNote = await prisma.note.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                content,
            },
        });
        return NextResponse.json(updatedNote);
    } catch (error) {
        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

            if (error.code === 'P2025') {
                return NextResponse.json({ 
                    message: "Note not found" 
                }, { status: 404 });
            }

            return NextResponse.json({ 
                error: error.message 
            }, { status: 500 });
        }
    }
}
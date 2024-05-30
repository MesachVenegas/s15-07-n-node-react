import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const messages = {
  sucess: {
    categoryCreated: 'La categoría se creó correctamente.',
    // Otras claves de éxito...
  },
  error: {
    default: 'Se produjo un error inesperado.',
    // Otras claves de error...
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, image, password } = body;

    if (!name || !email || !role || !password) {
      return NextResponse.json(
        { message: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        image,
        password: hashedPassword
      },
    });

    return NextResponse.json(
      { user: newUser, message: messages.sucess.categoryCreated },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for more details
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}

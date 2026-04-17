<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function administrar()
    {
        $autores = Autor::withCount('posts')->get();
        $posts = Post::with('autor')->latest()->get();

        return Inertia::render('Admin/Administrar', [
            'autores' => $autores,
            'posts' => $posts
        ]);
    }

    public function crearAutor(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255'
        ]);

        Autor::create($request->all());

        return redirect()->back();
    }

    public function crearPost(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'imagen' => 'required|url',
            'autor_id' => 'required|exists:autores,id'
        ]);

        Post::create($request->all());

        return redirect()->back();
    }

    public function actualizarPost(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->only(['titulo', 'contenido', 'imagen', 'autor_id']));

        return redirect()->back();
    }

    public function eliminarPost($id)
    {
        Post::findOrFail($id)->delete();

        return redirect()->back();
    }
}

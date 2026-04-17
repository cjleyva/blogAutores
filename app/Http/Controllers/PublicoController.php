<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PublicoController extends Controller
{
    public function listaPosts()
    {
        $posts = Post::with('autor')->latest()->get();

        return Inertia::render('Publico/ListaPosts', [
            'posts' => $posts
        ]);
    }

    public function detallePost($id)
    {
        $post = Post::with('autor')->findOrFail($id);

        return Inertia::render('Publico/DetallePost', [
            'post' => $post
        ]);
    }
}

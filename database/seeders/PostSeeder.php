<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'titulo' => 'El futuro de la tecnología en 2024',
            'contenido' => 'La inteligencia artificial está transformando nuestra forma de trabajar y vivir. Este año veremos avances significativos en automatización y aprendizaje automático.',
            'imagen' => 'https://picsum.photos/id/1/800/400',
            'autor_id' => 1
        ]);

        Post::create([
            'titulo' => 'Consejos para escribir mejores posts',
            'contenido' => 'La escritura es una habilidad que se puede mejorar con práctica diaria. Lo más importante es leer mucho y escribir todos los días.',
            'imagen' => 'https://picsum.photos/id/0/800/400',
            'autor_id' => 2
        ]);

        Post::create([
            'titulo' => 'Productividad en el trabajo remoto',
            'contenido' => 'Trabajar desde casa requiere disciplina y buenos hábitos. Establecer una rutina y un espacio dedicado son clave para el éxito.',
            'imagen' => 'https://picsum.photos/id/100/800/400',
            'autor_id' => 1
        ]);
    }
}

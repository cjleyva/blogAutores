<?php

namespace Database\Seeders;

use App\Models\Autor;
use Illuminate\Database\Seeder;

class AutorSeeder extends Seeder
{
    public function run(): void
    {
        Autor::create(['nombre' => 'Mario', 'apellidos' => 'García López']);
        Autor::create(['nombre' => 'Carlos', 'apellidos' => 'Martínez Ruiz']);
        Autor::create(['nombre' => 'Laura', 'apellidos' => 'Fernández Díaz']);
    }
}

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicoController;
use App\Http\Controllers\AdminController;

// Rutas Públicas
Route::get('/', [PublicoController::class, 'listaPosts'])->name('lista.posts');
Route::get('/post/{id}', [PublicoController::class, 'detallePost'])->name('detalle.post');

// Rutas Administrativas (sin login como pide el caso de estudio)
Route::get('/admin', [AdminController::class, 'administrar'])->name('admin');
Route::post('/admin/autores', [AdminController::class, 'crearAutor']);
Route::post('/admin/posts', [AdminController::class, 'crearPost']);
Route::put('/admin/posts/{id}', [AdminController::class, 'actualizarPost']);
Route::delete('/admin/posts/{id}', [AdminController::class, 'eliminarPost']);

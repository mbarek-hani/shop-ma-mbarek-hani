<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::apiResource("products", ProductController::class);
Route::apiResource("contacts", ContactController::class);
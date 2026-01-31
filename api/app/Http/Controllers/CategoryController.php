<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Return all categories.
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Return a single category (with optional products).
     */
    public function show(string $id)
    {
        return Category::with('products')->findOrFail($id);
    }
}

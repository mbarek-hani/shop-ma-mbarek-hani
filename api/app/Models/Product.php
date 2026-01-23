<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillables = [
        "name",
        "price",
        "category",
        "image",
        "in_stock",
        "description",
    ];
    protected $casts = [
        "in_stock" => "boolean",
        "price" => "decimal:2",
    ];
}

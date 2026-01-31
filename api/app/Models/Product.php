<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'category_id',
        'image',
        'in_stock',
        'description',
        'rating_rate',
        'rating_count',
    ];

    protected $casts = [
        'in_stock' => 'boolean',
        'price' => 'float',
        'rating_rate' => 'float',
        'rating_count' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function getCategoryAttribute()
    {
        return $this->category ? $this->category->name : null;
    }
}

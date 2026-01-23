<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "price" => (float) $this->price,
            "category" => $this->category,
            "image" => $this->image,
            "inStock" => (bool) $this->in_stock, // snake_case to camelCase
            "description" => $this->description,
        ];
    }
}

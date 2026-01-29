<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path("data/products.json"));

        $products = json_decode($json, true);

        foreach ($products as $product) {
            Product::create([
                "name" => $product["name"],
                "price" => $product["price"],
                "category" => $product["category"],
                "image" => $product["image"],
                "in_stock" => $product["inStock"],
                "description" => $product["description"],
                "rating_rate" => $product["rating_rate"],
                "rating_count" => $product["rating_count"]
            ]);
        }
    }
}

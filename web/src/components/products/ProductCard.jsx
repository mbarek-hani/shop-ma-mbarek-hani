import { Button } from "@/components";

function ProductCard({ product }) {
  return (
    <article className="bg-white rounded-lg flex flex-col justify-between p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-3 flex-1">
        {product.in_stock ? (
          <span className="inline-block text-xs text-white bg-green-600 px-2 py-1 rounded-md">
            Disponible
          </span>
        ) : (
          <span className="inline-block text-xs text-white bg-orange-600 px-2 py-1 rounded-md">
            Indisponible
          </span>
        )}

        <h3 className="mt-2 text-sm md:text-base font-medium text-gray-800">
          {product.name}{" "}
          {product.badge && (
            <span className="ml-2 text-xs text-gray-500">{product.badge}</span>
          )}
        </h3>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-green-600 font-semibold">{product.price} DH</span>
        <Button disabled={!product.in_stock}>Ajouter</Button>
      </div>
    </article>
  );
}

export default ProductCard;

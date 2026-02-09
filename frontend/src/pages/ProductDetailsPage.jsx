import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";

function ProductDetailsPage() {
  const {
    currentProduct,
    loading,
    error,
    fetchProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <button onClick={() => navigate("/")} className="mb-8 btn btn-ghost">
        <ArrowLeftIcon className="mr-2 size-4" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* PRODUCT IMAGE */}
        <div className="overflow-hidden rounded-lg shadow-lg bg-base-100">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="object-cover size-full"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="shadow-lg card bg-base-100">
          <div className="card-body">
            <h2 className="mb-6 text-2xl card-title">{currentProduct?.name}</h2>

            <div className="space-y-6">
              {/* PRODUCT PRICE */}
              <div>
                <label className="text-sm font-medium text-base-content/70">Price</label>
                <p className="text-3xl font-bold text-primary">
                  KES {Number(currentProduct?.price).toFixed(2)}
                </p>
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-base-content/70">Description</label>
                <p className="text-sm leading-relaxed text-base-content/80 whitespace-pre-wrap">
                  {currentProduct?.description || "No description available"}
                </p>
              </div>

              {/* CREATED DATE */}
              {currentProduct?.created_at && (
                <div>
                  <label className="text-sm font-medium text-base-content/70">Added on</label>
                  <p className="text-sm text-base-content/80">
                    {new Date(currentProduct?.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;

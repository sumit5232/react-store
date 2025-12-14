import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { logout } from '../features/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetProductsQuery, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} from '../services/productsApi';
import { Search, Star, X, Trash2, Edit, Save, ShoppingBag, LogOut } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Data Fetching
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');

  // Logout Function
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  const filteredProducts = products?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div></div>;
  if (isError) return <div className="flex h-screen items-center justify-center text-red-500">Failed to load products.</div>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      title: formData.get('title'),
      price: parseFloat(formData.get('price')),
      description: formData.get('description'),
    };
    try {
      await updateProduct({ id: selectedProduct.id, data: updatedData }).unwrap();
      setIsEditing(false);
      setSelectedProduct(null);
    } catch (err) { alert('Failed to update'); }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try { await deleteProduct(selectedProduct.id).unwrap(); setSelectedProduct(null); } 
      catch (err) { alert('Failed to delete'); }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/*  Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 pb-24 pt-12 text-white shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">FakeStore Inventory</h1>
            </div>
            
            {/* Search & Logout */}
            <div className="flex w-full items-center gap-4 md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-indigo-200" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-indigo-200 backdrop-blur-md transition focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="group flex items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-md transition hover:bg-red-500 hover:text-white"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-white" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <main className="container mx-auto -mt-16 px-6 pb-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts?.map((product) => (
             <div
              key={product.id}
              onClick={() => { setSelectedProduct(product); setIsEditing(false); }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-56 w-full bg-white p-6 transition-colors group-hover:bg-gray-50">
                <img src={product.image} alt={product.title} className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-xs font-bold text-gray-600 shadow-sm">
                  {product.category}
                </span>
              </div>
              
              <div className="border-t border-gray-100 p-5">
                <h3 className="mb-2 truncate text-lg font-semibold text-gray-800" title={product.title}>{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating?.rate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

       {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-red-100 hover:text-red-500"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="flex h-96 w-full items-center justify-center bg-gray-50 p-8 md:w-1/2">
                <img src={selectedProduct.image} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>

              <div className="flex flex-col justify-between p-8 md:w-1/2">
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <label className="text-sm font-semibold text-gray-500">Title</label>
                    <input name="title" defaultValue={selectedProduct.title} className="rounded-lg border bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <label className="text-sm font-semibold text-gray-500">Price</label>
                    <input name="price" type="number" step="0.01" defaultValue={selectedProduct.price} className="rounded-lg border bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <label className="text-sm font-semibold text-gray-500">Description</label>
                    <textarea name="description" defaultValue={selectedProduct.description} className="h-32 rounded-lg border bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <button type="submit" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
                      <Save size={20} /> Save Changes
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">
                        {selectedProduct.category}
                      </span>
                      <h2 className="mb-4 text-3xl font-bold text-gray-900 leading-tight">{selectedProduct.title}</h2>
                      <div className="mb-6 flex items-center gap-4">
                        <span className="text-4xl font-bold text-gray-900">${selectedProduct.price}</span>
                        <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1">
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-amber-700">{selectedProduct.rating?.rate}</span>
                          <span className="text-gray-400">({selectedProduct.rating?.count} reviews)</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                    </div>

                    <div className="mt-8 flex gap-4 pt-8 border-t border-gray-100">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-800"
                      >
                        <Edit size={18} /> Edit
                      </button>
                      <button onClick={handleDelete} className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 font-semibold text-red-600 transition hover:bg-red-100">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
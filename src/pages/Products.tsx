import { useState } from 'react';
import { Card, Heading, Button, Input } from '@sunaina-dev/ui-library';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'MacBook Pro 16"', price: 2499, stock: 12, category: 'Laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600' },
    { id: 2, name: 'iPhone 15 Pro', price: 999, stock: 45, category: 'Phones', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600' },
    { id: 3, name: 'AirPods Pro', price: 249, stock: 89, category: 'Audio', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600' },
    { id: 4, name: 'iPad Air', price: 599, stock: 23, category: 'Tablets', image: 'https://images.unsplash.com/photo-1544240713-30b0e5e3dc35?w=600' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Laptops',
    image: ''
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: 'Laptops', image: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
      image: product.image
    });
    setIsModalOpen(true);
  };

const handleDelete = (id: number) => {
  if (window.confirm('Delete this product? This cannot be undone.')) {
    setProducts(products.filter(p => p.id!== id));
  }
};

  const handleSave = () => {
    const priceNum = Number(formData.price);
    const stockNum = Number(formData.stock);

    if (!formData.name || priceNum <= 0) {
      alert('Product name and valid price are required');
      return;
    }

    const productData = {
      name: formData.name,
      price: priceNum,
      stock: stockNum,
      category: formData.category,
      image: formData.image
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id? {...p,...productData } : p));
    } else {
      setProducts([...products, { id: Date.now(),...productData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 [&>div]:px-0">
        <Heading
          title="Product Inventory"
          subtitle={`${products.length} products in stock`}
          level={3}
        />
        <Button variant="primary" onClick={handleAdd}>
          + Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Card>
              <div className="relative overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-xs font-bold text-slate-700 shadow-sm">
                  {product.category}
                </div>
                <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl backdrop-blur-sm text-xs font-bold shadow-sm ${
                  product.stock > 20
                  ? 'bg-emerald-500/90 text-white'
                    : product.stock > 5
                  ? 'bg-amber-500/90 text-white'
                    : 'bg-rose-500/90 text-white'
                }`}>
                  {product.stock} left
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{product.name}</h3>
                  <p className="text-3xl font-extrabold text-slate-900 mt-2">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h- overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <Heading
                title={editingProduct? 'Edit Product' : 'Add New Product'}
                level={3}
                className="p-0 max-w-none"
              />
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value })}
                  placeholder="MacBook Pro 16 inch"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
                  <Input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value })}
                    placeholder="999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Qty</label>
                  <Input
                    type="text"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value })}
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900"
                >
                  <option value="Laptops">Laptops</option>
                  <option value="Phones">Phones</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Audio">Audio</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded-xl border border-slate-200"
                  />
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-b-3xl flex gap-3 justify-end sticky bottom-0">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                {editingProduct? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { Dispatch, SetStateAction, useState } from "react";
interface ProductCategory {
  category: string;
}
function ProductCategoryRow({ category }: ProductCategory) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

interface Product {
  category: string;
  name: string;
  stocked: boolean;
  price: string;
}
function ProductRow({ product }: { product: Product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

interface ProductTableProp {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}
function ProductTable({ products, filterText, inStockOnly }: ProductTableProp) {
  const rows: any = [];
  let lastCategory: null | string = null;

  products.forEach((product) => {
    // if searched text is empty
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    // jika filter in stock ON dan product bukan instock
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (e: string) => void;
  onInStockOnlyChange: (e: boolean) => void;
}) {
  return (
    <form className="d-flex flex-column">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  return (
    <div className="px-4 py-2">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "10k", stocked: true, name: "Apple" },
  { category: "Fruits", price: "12k", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "14k", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "8k", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "9k", stocked: true, name: "Pumpkin" },
  { category: "Vegetables", price: "9k", stocked: false, name: "Peas" },
];

export default function Index() {
  return <FilterableProductTable products={PRODUCTS} />;
}

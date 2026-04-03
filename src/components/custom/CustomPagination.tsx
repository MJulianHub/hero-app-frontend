import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("page") ?? "1";
  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    // ❗ crear una nueva instancia (NO mutar searchParams)
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    setSearchParams(params);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Anterior */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {/* Páginas */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(index + 1)} // ❗ faltaba esto
        >
          {index + 1}
        </Button>
      ))}

      {/* Siguiente */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)} // ❗ faltaba esto
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

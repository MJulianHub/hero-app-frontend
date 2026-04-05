import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Busqueda de super Heroes"
        description="Administra super heroes y villanos"
      />

      <CustomBreadCrumbs
        currentPage="Buscardor heroes"
        // breadcrumbs={[
        //   { label: "Home", to: "/" },
        //   { label: "Home2", to: "/" },
        //   { label: "Home3", to: "/" },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />
    </>
  );
};

export default SearchPage;

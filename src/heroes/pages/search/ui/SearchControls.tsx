import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react";
import { useRef } from "react";
import { useSearchParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

export const SearchControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const activeAccordion = searchParams.get("active-accordion") ?? "";
  const selectedStrength = Number(searchParams.get("strength") ?? "0");

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      const value = inputRef.current?.value ?? "";
      setQueryParams("name", value);
    }
  };

  const clearStrength = () => {
    setSearchParams((prev) => {
      prev.delete("strength");
      return prev;
    });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            placeholder="Search heroes, villains, powers, teams..."
            className="pl-12 h-12 text-lg bg-white"
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get("name") ?? ""}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeAccordion == "advance-filters" ? "default" : "outline"}
            className="h-12"
            onClick={() => {
              if (activeAccordion == "advance-filters") {
                setQueryParams("active-accordion", "");
                return;
              }
              setQueryParams("active-accordion", "advance-filters");
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible value={activeAccordion}>
        <AccordionItem value="advance-filters">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Strength Filter</h3>
                {selectedStrength > 0 && (
                  <Button variant="ghost" onClick={clearStrength}>
                    Clear
                  </Button>
                )}
              </div>
              <div className="max-w-md">
                <label className="text-sm font-medium">
                  Minimum Strength: {selectedStrength}/10
                </label>
                <Slider
                  defaultValue={[selectedStrength]}
                  onValueChange={(value) =>
                    setQueryParams("strength", value[0].toString())
                  }
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

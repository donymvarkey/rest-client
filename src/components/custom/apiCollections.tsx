import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelector } from "react-redux";

const ApiCollections = () => {
  const { collection } = useSelector((state: any) => state.collection);

  return (
    <div className="w-full">
      {collection?.length > 0 ? (
        <Accordion type="multiple">
          {collection?.length &&
            collection.map((c: any) => (
              <AccordionItem key={c.id} value={c.id}>
                <AccordionTrigger>{c.name}</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      ) : (
        <span className="text-xs font-nunito text-zinc-500">
          No Collections Found
        </span>
      )}
    </div>
  );
};

export default ApiCollections;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface LineItemData {
  name: string;
  description: string;
  amount: number;
}

interface LineItemEditorProps {
  value: LineItemData[];
  onChange: (items: LineItemData[]) => void;
}

export function LineItemEditor({ value, onChange }: LineItemEditorProps) {
  const addItem = () => {
    onChange([...value, { name: "", description: "", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof LineItemData, val: string) => {
    const updated = [...value];
    if (field === "amount") {
      updated[index] = { ...updated[index], amount: parseFloat(val) || 0 };
    } else {
      updated[index] = { ...updated[index], [field]: val };
    }
    onChange(updated);
  };

  const total = value.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <div key={index} className="border border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Item {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="text-muted-foreground hover:text-foreground size-7"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-[1fr_150px] gap-3">
            <Input
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder="Item name (e.g., Mobilization Fee 30%)"
              className="bg-transparent"
            />
            <Input
              type="number"
              step="0.01"
              value={item.amount || ""}
              onChange={(e) => updateItem(index, "amount", e.target.value)}
              placeholder="0.00"
              className="bg-transparent font-mono"
            />
          </div>
          <Textarea
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            placeholder="Item description (optional — detailed scope for this line item)"
            className="bg-transparent min-h-[60px]"
          />
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        + Add Line Item
      </Button>

      <div className="flex justify-end pt-2 border-t border-border">
        <span className="text-sm text-muted-foreground mr-4">Total:</span>
        <span className="font-mono font-bold">{total.toLocaleString()}</span>
      </div>
    </div>
  );
}

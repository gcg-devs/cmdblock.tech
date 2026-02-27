"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface LineItemData {
  description: string;
  amount: number;
}

interface LineItemEditorProps {
  value: LineItemData[];
  onChange: (items: LineItemData[]) => void;
}

export function LineItemEditor({ value, onChange }: LineItemEditorProps) {
  const addItem = () => {
    onChange([...value, { description: "", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof LineItemData, val: string) => {
    const updated = [...value];
    if (field === "amount") {
      updated[index] = { ...updated[index], amount: parseFloat(val) || 0 };
    } else {
      updated[index] = { ...updated[index], description: val };
    }
    onChange(updated);
  };

  const total = value.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_150px_40px] gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
        <span>Description</span>
        <span>Amount</span>
        <span></span>
      </div>

      {value.map((item, index) => (
        <div key={index} className="grid grid-cols-[1fr_150px_40px] gap-2">
          <Input
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            placeholder="Line item description"
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
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

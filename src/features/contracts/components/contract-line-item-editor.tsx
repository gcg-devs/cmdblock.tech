"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContractLineItem {
  name: string;
  description: string;
  amount: number;
}

interface ContractLineItemEditorProps {
  value: ContractLineItem[];
  onChange: (items: ContractLineItem[]) => void;
}

export function ContractLineItemEditor({
  value,
  onChange,
}: ContractLineItemEditorProps) {
  function updateItem(index: number, patch: Partial<ContractLineItem>) {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    onChange([...value, { name: "", description: "", amount: 0 }]);
  }

  function removeItem(index: number) {
    if (value.length === 1) return;
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <div key={index} className="border border-border p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px_auto] gap-3">
            <Input
              value={item.name}
              onChange={(event) => updateItem(index, { name: event.target.value })}
              placeholder="Deliverable name"
            />
            <Input
              type="number"
              step="0.01"
              value={item.amount}
              onChange={(event) =>
                updateItem(index, { amount: Number(event.target.value) })
              }
              placeholder="Amount"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => removeItem(index)}
              disabled={value.length === 1}
            >
              Remove
            </Button>
          </div>
          <Textarea
            value={item.description}
            onChange={(event) =>
              updateItem(index, { description: event.target.value })
            }
            placeholder="Short scope note for this deliverable"
            rows={3}
          />
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addItem}>
        Add Deliverable
      </Button>
    </div>
  );
}

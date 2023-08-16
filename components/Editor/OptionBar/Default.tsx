import { BackgroundVariant } from "reactflow"

import { Select } from "@/components/ui/select"

interface Props {
  setBgVariant: (value: BackgroundVariant) => void
}

export function DefaultOptions({ setBgVariant }: Props) {
  const getBgVariant = (value: string): BackgroundVariant => {
    switch (value) {
      case "Dots":
        return BackgroundVariant.Dots
      case "Lines":
        return BackgroundVariant.Lines
      case "Cross":
        return BackgroundVariant.Cross
      default:
        return BackgroundVariant.Dots
    }
  }

  return (
    <div>
      <h2>Background</h2>
      <div>
        <Select
          variant="outline"
          size="sm"
          onChange={(e) => setBgVariant(getBgVariant(e.target.value))}
        >
          <option value="Dots">Points</option>
          <option value="Lines">Lignes</option>
          <option value="Cross">Croix</option>
        </Select>
      </div>
    </div>
  )
}

import { Box } from "@mui/material";

export interface HeaderProps {
  title: string
  actions: React.ReactNode
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <Box p={2} display="flex" justifyContent="space-between">
      <Box>
        {title}
      </Box>

      <Box>
        {actions}
      </Box>
    </Box>
  );
};

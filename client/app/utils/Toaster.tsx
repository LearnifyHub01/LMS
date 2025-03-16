import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      //theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg rounded-lg p-4 flex items-center gap-2 transition-all duration-300 ease-in-out",
          description:
            "group-[.toast]:text-muted-foreground text-sm italic",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground px-3 py-1 rounded-md hover:group-[.toast]:bg-primary/90",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground px-2 py-1 rounded-md hover:group-[.toast]:bg-muted/80",
          // Add styles for specific toast types
          success: "group-[.toaster]:bg-green-100 group-[.toaster]:text-green-800 group-[.toaster]:border-green-300",
          error: "group-[.toaster]:bg-red-100 group-[.toaster]:text-red-800 group-[.toaster]:border-red-300",
          info: "group-[.toaster]:bg-blue-100 group-[.toaster]:text-blue-800 group-[.toaster]:border-blue-300",
          warning: "group-[.toaster]:bg-yellow-100 group-[.toaster]:text-yellow-800 group-[.toaster]:border-yellow-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../utils/cn"
import { X } from "lucide-react"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "pcp-fixed pcp-inset-0 pcp-z-50 pcp-bg-background/50 pcp-backdrop-blur-sm data-[state=open]:pcp-animate-in data-[state=closed]:pcp-animate-out data-[state=closed]:pcp-fade-out-0 data-[state=open]:pcp-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-pcp-root=""
      className={cn(
        "pcp-fixed pcp-left-[50%] pcp-top-[50%] pcp-z-50 pcp-grid pcp-w-full pcp-max-w-lg pcp-dialog-center pcp-gap-4 pcp-border pcp-border-border pcp-bg-background pcp-p-6 pcp-shadow-lg pcp-duration-200 data-[state=open]:pcp-animate-in data-[state=closed]:pcp-animate-out data-[state=closed]:pcp-fade-out-0 data-[state=open]:pcp-fade-in-0 data-[state=closed]:pcp-dialog-center-scale-95 data-[state=open]:pcp-dialog-center-scale-100 pcp-sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="pcp-absolute pcp-right-4 pcp-top-4 pcp-rounded-sm pcp-opacity-70 pcp-ring-offset-background pcp-transition-opacity hover:pcp-opacity-100 focus:pcp-outline-none focus:pcp-ring-2 focus:pcp-ring-ring focus:pcp-ring-offset-2 disabled:pcp-pointer-events-none data-[state=open]:pcp-bg-accent data-[state=open]:pcp-text-muted-foreground">
        <X className="pcp-h-4 pcp-w-4" />
        <span className="pcp-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "pcp-flex pcp-flex-col pcp-space-y-1.5 pcp-text-center pcp-sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "pcp-flex pcp-flex-col-reverse pcp-sm:flex-row pcp-sm:justify-end pcp-sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "pcp-text-lg pcp-font-semibold pcp-leading-none pcp-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("pcp-text-sm pcp-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} 
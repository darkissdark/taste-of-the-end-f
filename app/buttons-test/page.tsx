import React from "react";
import Button from "@/components/buttons/Buttons";

// Example SVG icons (team can use any icons they want)
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function ButtonsTestPage() {
  return (
    <div
      style={{
        padding: "40px",
        background: "#1a1a1a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "40px" }}>Button Component Showcase</h1>

      {/* ===== BROWN VARIANT ===== */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "20px", color: "#d4a574" }}>
          🟤 Brown Buttons
        </h2>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            All Sizes (without icons)
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="brown" size="sm">
              Small
            </Button>
            <Button variant="brown" size="md">
              Medium
            </Button>
            <Button variant="brown" size="lg">
              Large
            </Button>
            <Button variant="brown" size="xl">
              Extra Large
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            With Icons
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="brown" size="sm" iconLeft={<PlusIcon />}>
              Add Item
            </Button>
            <Button variant="brown" size="md" iconRight={<ArrowIcon />}>
              Continue
            </Button>
            <Button variant="brown" size="lg" iconLeft={<HeartIcon />}>
              Favorite
            </Button>
            <Button
              variant="brown"
              size="xl"
              iconLeft={<PlusIcon />}
              iconRight={<ArrowIcon />}
            >
              Both Icons
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            States (hover, click, disabled)
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="brown" size="md">
              Normal
            </Button>
            <Button variant="brown" size="md" disabled>
              Disabled
            </Button>
            <Button variant="brown" size="md">
              Click Me!
            </Button>
          </div>
        </div>
      </section>

      {/* ===== WHITE VARIANT ===== */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "20px", color: "#ffffff" }}>
          ⚪ White Buttons
        </h2>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            All Sizes
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="white" size="sm">
              Small
            </Button>
            <Button variant="white" size="md">
              Medium
            </Button>
            <Button variant="white" size="lg">
              Large
            </Button>
            <Button variant="white" size="xl">
              Extra Large
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            With Icons
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="white" size="md" iconLeft={<PlusIcon />}>
              Add
            </Button>
            <Button variant="white" size="md" iconRight={<ArrowIcon />}>
              Next
            </Button>
            <Button variant="white" size="lg" iconLeft={<HeartIcon />}>
              Save
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            States
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="white" size="md">
              Normal
            </Button>
            <Button variant="white" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENT VARIANT ===== */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "20px", color: "#888" }}>
          ⬜ Transparent Buttons
        </h2>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            All Sizes
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="transparent" size="sm">
              Small
            </Button>
            <Button variant="transparent" size="md">
              Medium
            </Button>
            <Button variant="transparent" size="lg">
              Large
            </Button>
            <Button variant="transparent" size="xl">
              Extra Large
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            With Icons (perfect for navigation)
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="transparent" size="md" iconLeft={<ArrowIcon />}>
              Back
            </Button>
            <Button variant="transparent" size="md" iconRight={<ArrowIcon />}>
              Next
            </Button>
            <Button variant="transparent" size="md">
              Skip
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            States
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="transparent" size="md">
              Normal
            </Button>
            <Button variant="transparent" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PRACTICAL EXAMPLES ===== */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "20px" }}>💡 Real-World Examples</h2>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            Form Actions
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="transparent" size="md">
              Cancel
            </Button>
            <Button variant="transparent" size="sm">
              Small
            </Button>
            <Button variant="brown" size="md" iconRight={<ArrowIcon />}>
              Submit
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            Card Actions
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="white" size="sm" iconLeft={<HeartIcon />}>
              Like
            </Button>
            <Button variant="white" size="sm" iconLeft={<PlusIcon />}>
              Add to Cart
            </Button>
            <Button variant="brown" size="md">
              Buy Now
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "12px", opacity: 0.7 }}>
            Custom Width Example
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxWidth: "300px",
            }}
          >
            <Button variant="brown" size="md" style={{ width: "100%" }}>
              Full Width Button
            </Button>
            <Button variant="white" size="sm" style={{ width: "150px" }}>
              Fixed 150px
            </Button>
            <Button variant="transparent" size="sm" style={{ width: "100px" }}>
              Fixed 100px
            </Button>
            <Button variant="transparent" size="md" style={{ width: "100%" }}>
              Full Width Button
            </Button>
          </div>
        </div>
      </section>

      {/* ===== USAGE GUIDE ===== */}
      <section
        style={{
          background: "#2a2a2a",
          padding: "30px",
          borderRadius: "12px",
          marginTop: "60px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📖 How to Use</h2>
        <pre
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "8px",
            overflow: "auto",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          {`// Basic usage
<Button variant="brown" size="md">
  Click Me
</Button>

// With left icon
<Button variant="brown" size="lg" iconLeft={<YourIcon />}>
  Add Item
</Button>

// With right icon
<Button variant="white" size="md" iconRight={<ArrowIcon />}>
  Continue
</Button>

// Both icons
<Button 
  variant="brown" 
  size="xl" 
  iconLeft={<Icon1 />} 
  iconRight={<Icon2 />}
>
  Both Sides
</Button>

// Disabled state
<Button variant="brown" size="md" disabled>
  Disabled
</Button>

// Custom width (inline style or className)
<Button 
  variant="brown" 
  size="md" 
  style={{ width: "200px" }}
>
  Fixed Width
</Button>

// Full width
<Button 
  variant="brown" 
  size="md" 
  style={{ width: "100%" }}
>
  Full Width
</Button>

// With onClick handler
<Button 
  variant="brown" 
  size="md" 
  onClick={() => alert("Clicked!")}
>
  Click Handler
</Button>`}
        </pre>
      </section>
    </div>
  );
}

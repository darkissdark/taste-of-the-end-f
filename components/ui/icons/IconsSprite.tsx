// Server Component — монтируем скрытый sprite однажды на всей странице.
export default function IconsSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <symbol id="icon-recipes" viewBox="0 0 24 24">
        <path d="M4 3h12a2 2 0 0 1 2 2v1H4V3zm0 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm3 3h8v2H7v-2zm0 4h10v2H7v-2z" />
      </symbol>

      <symbol id="icon-user" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" />
      </symbol>

      <symbol id="icon-plus" viewBox="0 0 24 24">
        <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z" />
      </symbol>

      <symbol id="icon-heart" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.35-9.33-7.02A6 6 0 1 1 12 6a6 6 0 1 1 9.33 7.98C18.7 16.65 12 21 12 21z" />
      </symbol>

      <symbol id="icon-heart-filled" viewBox="0 0 24 24">
        <path d="M12 21s-6.7-4.35-9.33-7.02A6 6 0 0 1 12 4a6 6 0 0 1 9.33 9.98C18.7 16.65 12 21 12 21z" />
      </symbol>

      <symbol id="icon-logout" viewBox="0 0 24 24">
        <path d="M14 17l1.41-1.41L13.83 14H21v-2h-7.17l1.58-1.59L14 9l-4 4 4 4z" />
        <path d="M3 5h8v2H5v10h6v2H3z" />
      </symbol>

      <symbol id="icon-search" viewBox="0 0 24 24">
        <circle cx="10" cy="10" r="6" />
        <path d="M14.5 14.5L20 20" strokeWidth="2" stroke="currentColor" />
      </symbol>

      <symbol id="icon-profile" viewBox="0 0 24 24">
        <use href="#icon-user" />
      </symbol>
    </svg>
  );
}

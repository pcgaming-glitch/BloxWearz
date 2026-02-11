export default function AvatarIcon({ src, size = 40 }) {
  return (
    <img
      src={src}
      style={{
        width: size,
        height: size,
        borderRadius: "50%"
      }}
    />
  );
}

import Game from "./game";

window.addEventListener("DOMContentLoaded", () => {
  const Martes = new Game("martes");

  const animate = () => {
    Martes.update().draw();

    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
});

document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseover', function() {
      this.classList.add('highlight');
    });

    card.addEventListener('mouseout', function() {
      this.classList.remove('highlight');
    });
  });
});
// ==UserScript==
// @name         Auto Next Episode
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto next episode
// @match        https://theflixertv.to/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /**
   * Creates and displays the "Next Episode" button.
   * @param {HTMLElement} nextEpisodeElement - The next episode slide element.
   */
  function showNextEpisodeButton(nextEpisodeElement) {
      if (!nextEpisodeElement || document.getElementById('next-episode-btn')) return;

      const button = document.createElement('button');
      button.id = 'next-episode-btn';
      button.textContent = 'Next Episode';
      Object.assign(button.style, {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ff4500',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: '9999',
      });

      button.addEventListener('click', () => nextEpisodeElement.click());
      document.body.appendChild(button);
  }

  /**
   * Monitors the video playback and triggers the next episode button.
   */
  function monitorVideoProgress() {
      const video = document.querySelector('video');
      if (!video) return;

      video.addEventListener('timeupdate', () => {
          if (video.duration - video.currentTime <= 20) {
              const nextEpisode = document.querySelector('.swiper-slide.swiper-slide-next');
              showNextEpisodeButton(nextEpisode);
          }
      });
  }

  /**
   * Initializes the script after the page loads.
   */
  function init() {
      setTimeout(monitorVideoProgress, 3000);
  }

  window.addEventListener('load', init);
})();

// ==UserScript==
// @name         Auto Next Episode Button
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Show a "Next Episode" button 20 seconds before the video ends
// @match        *://*.theflixertv.to/*  // Adjust this to match your streaming site
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  alert("Tampermonkey script loaded!"); // Debug alert on initialization

  /**
   * Creates and displays the "Next Episode" button.
   * @param {HTMLElement} nextEpisodeElement - The next episode slide element.
   */
  function showNextEpisodeButton(nextEpisodeElement) {
      if (!nextEpisodeElement || document.getElementById("next-episode-btn"))
          return;

      alert("Next episode detected!"); // Debug alert when next episode is found

      const button = document.createElement("button");
      button.id = "next-episode-btn";
      button.textContent = "Next Episode";
      Object.assign(button.style, {
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ff4500",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: "9999",
      });

      button.addEventListener("click", () => {
          alert("Switching to next episode..."); // Debug alert when button is clicked
          nextEpisodeElement.click();
      });

      document.body.appendChild(button);
  }

  /**
   * Monitors the video playback and triggers the next episode button.
   */
  function monitorVideoProgress() {
      const video = document.querySelector('video');

      if (!video) {
          alert("No video element found!"); // Debug alert if video element is missing
          return;
      }

      alert("Video detected! Monitoring progress..."); // Debug alert when video is detected

      video.addEventListener("timeupdate", () => {
          if (video.duration - video.currentTime <= 20) {
              const nextEpisode = document.querySelector(
                  ".swiper-slide.swiper-slide-next"
              );
              if (nextEpisode) {
                  showNextEpisodeButton(nextEpisode);
              } else {
                  alert("Next episode not found!"); // Debug alert if no next episode
              }
          }
      });
  }

  /**
   * Initializes the script after the page loads.
   */
  function init() {
      alert("Initializing script..."); // Debug alert when script starts
      setTimeout(monitorVideoProgress, 3000);
  }

  window.addEventListener('load', init);
})();

import { writable } from 'svelte/store';

const defaultState = { playlist: [], index: 0, current: null, playing: false, currentTime: 0, duration: 0 };

function createPlayer() {
  const { subscribe, set, update } = writable(defaultState);

  return {
    subscribe,
    playTrack(track, playlist = [track]) {
      update(() => ({ ...defaultState, playlist, index: 0, current: playlist[0], playing: true }));
    },
    playList(playlist, index = 0) {
      update(() => ({ ...defaultState, playlist, index, current: playlist[index] || null, playing: true }));
    },
    play() {
      update(s => ({ ...s, playing: true }));
    },
    pause() {
      update(s => ({ ...s, playing: false }));
    },
    setProgress(currentTime, duration) {
      update(s => ({ ...s, currentTime, duration }));
    },
    next() {
      update(s => {
        if (!s.playlist.length) return s;
        let i = s.index + 1;
        if (i >= s.playlist.length) i = 0;
        return { ...s, index: i, current: s.playlist[i], playing: true };
      });
    },
    prev() {
      update(s => {
        if (!s.playlist.length) return s;
        let i = s.index - 1;
        if (i < 0) i = s.playlist.length - 1;
        return { ...s, index: i, current: s.playlist[i], playing: true };
      });
    },
    stop() {
      set(defaultState);
    }
  };
}

export const player = createPlayer();

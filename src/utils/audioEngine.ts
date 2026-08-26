/**
 * Procedural Cinematic Ambient Sound Engine for NEXUS
 * Pure Web Audio API
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Lowpass Filter for the cinematic drone
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);
  }

  public togglePlay(): boolean {
    this.init();
    if (!this.ctx || !this.filter) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopDrone();
      this.isPlaying = false;
    } else {
      this.startDrone();
      this.isPlaying = true;
    }
    return this.isPlaying;
  }

  private startDrone() {
    if (!this.ctx || !this.filter) return;

    // Sub oscillator (55Hz = A1)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Detuned sub oscillator (55.4Hz) for rich cinematic beating
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(55.35, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 2.5);

    this.droneOsc1.connect(droneGain);
    this.droneOsc2.connect(droneGain);
    droneGain.connect(this.filter);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private stopDrone() {
    if (this.droneOsc1) {
      try {
        this.droneOsc1.stop();
        this.droneOsc1.disconnect();
      } catch {
        // ignore if already stopped
      }
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try {
        this.droneOsc2.stop();
        this.droneOsc2.disconnect();
      } catch {
        // ignore
      }
      this.droneOsc2 = null;
    }
  }

  public updateFilterWithScroll(progress: number) {
    if (!this.ctx || !this.filter || !this.isPlaying) return;
    // Morph filter frequency as user travels deeper into the 3D world
    const targetFreq = 200 + progress * 600;
    this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
  }

  public toggleMute(): boolean {
    if (!this.masterGain || !this.ctx) return this.isMuted;
    this.isMuted = !this.isMuted;
    this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime, 0.05);
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playSceneTransition() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const audioEngine = new AudioEngine();

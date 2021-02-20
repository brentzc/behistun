import Service from '@ember/service';
import MetaMaskOnboarding from '@metamask/onboarding';

export default class MetamaskService extends Service {
  get isInstalled() {
    return MetaMaskOnboarding.isMetaMaskInstalled();
  }

  startOnboarding() {
    new MetaMaskOnboarding().startOnboarding();
  }
}

import { TwajengagroupPage } from './app.po';

describe('twajengagroup App', () => {
  let page: TwajengagroupPage;

  beforeEach(() => {
    page = new TwajengagroupPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

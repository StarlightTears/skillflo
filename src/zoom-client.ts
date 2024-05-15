import config from './shared/config';

window.addEventListener('load', () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  const { ZoomMtg } = window;
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();

  const query = Object.fromEntries(urlSearchParams.entries()) as {
    email: string;
    name: string;
    meetingNumber: string;
    signature: string;
    password: string;
    role: string;
  };

  const zoomConfig = {
    leaveUrl: `/zoom-client.html?${urlSearchParams.toString()}`,
    lang: 'ko-KO' as const,
    china: 0,
  };

  ZoomMtg.init({
    leaveUrl: zoomConfig.leaveUrl,
    disableCORP: true,
    // externalLinkPage: '',
    success() {
      ZoomMtg.i18n.load(zoomConfig.lang);
      ZoomMtg.i18n.reload(zoomConfig.lang);
      ZoomMtg.join({
        meetingNumber: query.meetingNumber,
        userName: query.name,
        signature: query.signature,
        sdkKey: config.ZOOM_CLIENT_ID,
        userEmail: query.email,
        passWord: query.password,
        success() {
          console.log('join meeting success');
          console.log('get attendeelist');
          ZoomMtg.getAttendeeslist({});
          ZoomMtg.getCurrentUser({
            /* eslint-disable @typescript-eslint/no-explicit-any */
            success: function (res: any) {
              console.log('success getCurrentUser', res.result.currentUser);
            },
            /* eslint-enable @typescript-eslint/no-explicit-any */
          });
        },
        error(res: unknown) {
          console.log(res);
        },
      });
    },
    error(res: unknown) {
      console.log(res);
    },
  });
});

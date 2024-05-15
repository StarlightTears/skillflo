import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import KJRU from 'jsrsasign';

import config from '../config';

interface GenerateSignaturePayload {
  meetingNumber: number;
  role: 1 | 0;
}

export const ZOOM_SDK_KEY = config.ZOOM_CLIENT_ID;

export function generateSignature({ meetingNumber, role }: GenerateSignaturePayload) {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const tokenHeader = { alg: 'HS256', typ: 'JWT' };

  const signaturePayload = {
    sdkKey: ZOOM_SDK_KEY,
    mn: meetingNumber,
    role,
    iat,
    exp,
    tokenExp: exp,
  };

  const headerString = JSON.stringify(tokenHeader);
  const payloadString = JSON.stringify(signaturePayload);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const signatureJWT = (KJRU as any)?.jws?.JWS?.sign('HS256', headerString, payloadString, config.ZOOM_CLIENT_SECRET);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return signatureJWT;
}

interface JoinZoomOptions {
  element: HTMLElement;
  meetingNumber: number;
  password: string;
  userName: string;
}

export const joinZoom = async ({ element, meetingNumber, password, userName }: JoinZoomOptions) => {
  const zoomClient = ZoomMtgEmbedded.createClient();
  const signature = generateSignature({
    meetingNumber,
    role: 0,
  });

  const { width, height } = element.getBoundingClientRect();
  const sizes = {
    width: width - 4,
    height: height - 80,
  };

  await zoomClient.init({
    zoomAppRoot: element,
    language: 'ko-KO',
    customize: {
      video: {
        popper: {
          disableDraggable: true,
        },
        isResizable: false,
        viewSizes: {
          default: sizes,
          ribbon: sizes,
        },
      },
    },
  });

  await zoomClient.join({
    signature,
    password,
    userName,
    sdkKey: ZOOM_SDK_KEY,
    meetingNumber: String(meetingNumber),
  });

  return zoomClient;
};

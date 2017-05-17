import { load } from 'metadata-detector-broker';
import { worker } from './worker/worker';

const blob: Blob = new Blob([ worker ], { type: 'application/javascript' });

const url: string = URL.createObjectURL(blob);

const metadataDetector = load(url);

export const locate = metadataDetector.locate;

export const strip = metadataDetector.strip;

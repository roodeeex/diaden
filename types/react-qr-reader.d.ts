declare module 'react-qr-reader' {
    export interface QrReaderProps {
        constraints?: MediaTrackConstraints;
        onResult?: (result: { text: string } | null) => void;
        onError?: (error: Error) => void;
        className?: string;
    }
    
    export const QrReader: React.FC<QrReaderProps>;
} 
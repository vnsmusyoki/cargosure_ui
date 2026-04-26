import { useState, useEffect } from 'react';
import { AlertCircle, X, RefreshCw, Copy, Check, Info, AlertTriangle } from 'lucide-react';

const ErrorSeverity = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

const ErrorCard = ({ 
  message, 
  description,
  severity = ErrorSeverity.ERROR,
  onDismiss, 
  onRetry,
  autoDismiss = false,
  autoDismissTimeout = 5000,
  showDetails = false,
  errorCode,
  showCopyButton = false, // Default to false for cleaner look
  className = '',
  dismissible = true,
  compact = false, // New prop for even thinner version
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(showDetails);

  useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismissTimeout);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissTimeout, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(onDismiss, 200);
    }
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
  };

  const handleCopyError = async () => {
    const errorText = `Error${errorCode ? ` ${errorCode}` : ''}: ${message}${description ? `\n${description}` : ''}`;
    await navigator.clipboard.writeText(errorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityConfig = {
    [ErrorSeverity.ERROR]: {
      bg: 'bg-red-25',
      border: 'border-red-200',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      titleColor: 'text-red-700',
      messageColor: 'text-red-600',
      buttonColor: 'text-red-400 hover:text-red-600',
      icon: AlertCircle,
    },
    [ErrorSeverity.WARNING]: {
      bg: 'bg-amber-25',
      border: 'border-amber-200',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-700',
      messageColor: 'text-amber-600',
      buttonColor: 'text-amber-400 hover:text-amber-600',
      icon: AlertTriangle,
    },
    [ErrorSeverity.INFO]: {
      bg: 'bg-blue-25',
      border: 'border-blue-200',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-700',
      messageColor: 'text-blue-600',
      buttonColor: 'text-blue-400 hover:text-blue-600',
      icon: Info,
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  if (!isVisible) return null;

  const paddingY = compact ? 'py-2' : 'py-3';
  const paddingX = compact ? 'px-3' : 'px-4';
  const gapSize = compact ? 'gap-2' : 'gap-3';
  const iconSize = compact ? 'w-7 h-7' : 'w-8 h-8';
  const iconInnerSize = compact ? 'w-4 h-4' : 'w-4.5 h-4.5';

  return (
    <div 
      className={`
        ${config.bg}
        border
        ${config.border}
        rounded-lg
        ${paddingY}
        ${paddingX}
        flex
        items-start
        ${gapSize}
        transition-all
        duration-200
        animate-slideDown
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${iconSize} rounded-full ${config.iconBg} flex items-center justify-center`}>
        <Icon className={`${iconInnerSize} ${config.iconColor}`} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-xs font-medium uppercase tracking-wide ${config.titleColor}`}>
            {severity === ErrorSeverity.ERROR && 'Error'}
            {severity === ErrorSeverity.WARNING && 'Warning'}
            {severity === ErrorSeverity.INFO && 'Note'}
          </p>
          {errorCode && (
            <span className="text-[11px] font-mono text-gray-400 px-1.5 py-0.5 rounded bg-gray-50">
              {errorCode}
            </span>
          )}
        </div>
        
        <p className={`text-sm ${config.messageColor} ${!compact ? 'mt-0.5' : ''} font-medium`}>
          {message}
        </p>
        
        {description && !compact && (
          <p className={`text-xs ${config.messageColor} mt-1 opacity-80`}>
            {description}
          </p>
        )}

        {/* Expandable Details */}
        {showDetails && !compact && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs mt-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expanded ? 'Hide details' : 'Show details'}
          </button>
        )}

        {expanded && showDetails && !compact && (
          <pre className="mt-2 text-[11px] bg-white/50 p-2 rounded overflow-x-auto">
            {JSON.stringify({ message, description, errorCode }, null, 2)}
          </pre>
        )}

        {/* Action Buttons */}
        {(onRetry || (showCopyButton && !compact)) && (
          <div className="flex gap-2 mt-2.5">
            {onRetry && (
              <button
                onClick={handleRetry}
                className="text-xs px-2.5 py-1 rounded-md font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 transition-colors flex items-center gap-1 border border-gray-200"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            )}
            
            {showCopyButton && !compact && (
              <button
                onClick={handleCopyError}
                className="text-xs px-2.5 py-1 rounded-md font-medium text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-1 border border-gray-200"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className={`flex-shrink-0 transition-colors ${config.buttonColor} p-0.5 hover:bg-white/50 rounded-md`}
          aria-label="Dismiss error"
        >
          <X className="w-3.5 h-3.5" strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
};

// Simplified version for common use cases
export const SimpleErrorCard = ({ message, onDismiss }) => (
  <ErrorCard message={message} onDismiss={onDismiss} compact={true} />
);

// Version with retry
export const RetryErrorCard = ({ message, onRetry, onDismiss }) => (
  <ErrorCard message={message} onRetry={onRetry} onDismiss={onDismiss} compact={true} />
);

// Animation styles (lighter, faster)
const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slideDown {
    animation: slideDown 0.2s ease-out;
  }

  /* Subtle background colors */
  .bg-red-25 { background-color: #fff5f5; }
  .bg-amber-25 { background-color: #fffbeb; }
  .bg-blue-25 { background-color: #eff6ff; }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export { ErrorCard, ErrorSeverity };
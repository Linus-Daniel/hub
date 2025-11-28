import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export function createSuccessResponse<T>(
  data: T, 
  message?: string, 
  pagination?: any
): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
    ...(pagination && { pagination })
  };
  
  return NextResponse.json(response);
}

export function createErrorResponse(
  error: string, 
  status: number = 500,
  details?: any
): NextResponse {
  const response: ApiResponse = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
    ...(details && { details })
  };
  
  return NextResponse.json(response, { status });
}

export function createValidationErrorResponse(errors: any[]): NextResponse {
  return NextResponse.json({
    success: false,
    error: 'Validation failed',
    details: errors,
    timestamp: new Date().toISOString(),
  }, { status: 400 });
}
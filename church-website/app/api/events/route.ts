import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/server';

export async function GET(request: NextRequest) {
  const day = request.nextUrl.searchParams.get('day');
  
  if (!day) {
    return NextResponse.json({ error: 'No date provided' }, { status: 400 });
  }

    // First check if the user exists in the database
    console.log("day: ", day);
    
    const { data: userData, error: userError } = await supabase
      .from('events')
      .select('*')
      .gte('date', day)
      .lt('date', new Date(new Date(day).setDate(new Date(day).getDate() + 1)).toISOString());
    
    if (userError) {
      console.log('No events found');
      console.log(userError);
    return;}
    
    console.log('Event found');
    return NextResponse.json(userData);
 
} 
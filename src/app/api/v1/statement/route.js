/**
 * v3/market/user/statement
 */

export async function GET(request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type'); // Optional filter by transaction type
    
    // Mock data for demonstration
    // In a real application, you would fetch this from a database
    const mockStatements = generateMockStatements(page, limit, startDate, endDate, type);
    
    return Response.json({
      success: true,
      data: {
        statements: mockStatements.items,
        pagination: {
          total: mockStatements.total,
          page,
          limit,
          totalPages: Math.ceil(mockStatements.total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching statements:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch statements', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Generate mock statement data for demonstration
 */
function generateMockStatements(page, limit, startDate, endDate, type) {
  const types = ['purchase', 'sale', 'withdrawal', 'deposit', 'refund'];
  const total = 100; // Total number of statements in the database
  
  // Apply date filtering if provided
  let filteredTotal = total;
  if (startDate || endDate || type) {
    // In a real app, this would be a database query
    filteredTotal = Math.floor(total * 0.7); // Simulate filtered results
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredTotal);
  const items = [];
  
  for (let i = startIndex; i < endIndex; i++) {
    const randomType = type || types[Math.floor(Math.random() * types.length)];
    const amount = parseFloat((Math.random() * 1000).toFixed(2));
    
    items.push({
      id: `stmt-${i + 1}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      type: randomType,
      amount: randomType === 'purchase' || randomType === 'withdrawal' ? -amount : amount,
      balance: parseFloat((10000 + Math.random() * 5000).toFixed(2)),
      description: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} transaction`,
      status: Math.random() > 0.1 ? 'completed' : 'pending'
    });
  }
  
  return {
    total: filteredTotal,
    items
  };
}

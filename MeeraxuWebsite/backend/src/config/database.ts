import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const ensureAdminAccount = async (email: string, password: string, name: string, role: 'admin' | 'super-admin') => {
  const existingAdmin = await Admin.findOne({ email });

  if (!existingAdmin) {
    const admin = new Admin({ email, password, name, role });
    await admin.save();
    console.log(`✅ ${role === 'super-admin' ? 'Super Admin' : 'Admin'} created: ${email}`);
    return;
  }

  existingAdmin.password = password;
  existingAdmin.name = name;
  existingAdmin.role = role;
  await existingAdmin.save();
  console.log(`ℹ️  Existing ${role === 'super-admin' ? 'super admin' : 'admin'} updated: ${email}`);
};

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/meeraxu';
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB connected successfully');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@meeraxu.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Admin';

    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@meeraxu.com';
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || adminPassword;
    const superAdminName = process.env.SUPER_ADMIN_NAME || 'Super Admin';

    await ensureAdminAccount(adminEmail, adminPassword, adminName, 'admin');
    await ensureAdminAccount(superAdminEmail, superAdminPassword, superAdminName, 'super-admin');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.error('⚠️  The server will continue running but database operations will fail.');
    console.error('👉  Please whitelist your current IP in MongoDB Atlas:');
    console.error('    https://cloud.mongodb.com → Security → Network Access → Add IP Address');
  }
};

export default connectDB;

package com.vio.in28.todos;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoder;
import io.jsonwebtoken.security.Keys;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Arrays;

public class KeyPairGenerator {
	public static void main(String[] args) throws Exception {
		String pubKeyFN = "jwtkeys/es512public.key";
		String privKeyFN = "jwtkeys/es512private.key";
		System.out.println("Generating KeyPair...");
		KeyPair kp = Keys.keyPairFor(SignatureAlgorithm.ES512);
		writeToFile(pubKeyFN, kp.getPublic().getEncoded());
		writeToFile(privKeyFN, kp.getPrivate().getEncoded());
		System.out.println("KeyPair Generated.");
		System.out.println("Validating keys...");
		KeyPair kp2 = new KeyPair(getPublic(pubKeyFN), getPrivate(privKeyFN));
		
		if ((Arrays.compare(kp.getPrivate().getEncoded(), kp2.getPrivate().getEncoded()) != 0)
				|| (Arrays.compare(kp.getPublic().getEncoded(), kp2.getPublic().getEncoded()) != 0)) {
			System.err.println("Written keys did not validate.");
			return;
		}
		System.out.println("Validation Successfull.");
	}

	private static void writeToFile(String path, byte[] key) throws IOException {
		File f = new File(path);
		f.getParentFile().mkdirs();

		FileOutputStream fos = new FileOutputStream(f);
		fos.write(Base64.getEncoder().encode(key));
		fos.flush();
		fos.close();
	}

	private static PrivateKey getPrivate(String filename) throws Exception {
		byte[] keyBytes = Base64.getDecoder().decode(Files.readAllBytes(new File(filename).toPath()));
		PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory kf = KeyFactory.getInstance("EC");
		return kf.generatePrivate(spec);
	}

	// https://docs.oracle.com/javase/8/docs/api/java/security/spec/X509EncodedKeySpec.html
	private static PublicKey getPublic(String filename) throws Exception {
		byte[] keyBytes = Base64.getDecoder().decode(Files.readAllBytes(new File(filename).toPath()));
		X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
		KeyFactory kf = KeyFactory.getInstance("EC");
		return kf.generatePublic(spec);
	}
}
